<?php

namespace Tests\Feature;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CropSeasonAndFarmingLogDatabaseTest extends TestCase
{
    private int $farmerUserId;
    private int $adminUserId;
    private int $productionAreaId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->cleanAll();
        $this->seedPrerequisites();
    }

    protected function tearDown(): void
    {
        $this->cleanAll();
        parent::tearDown();
    }

    private function cleanAll(): void
    {
        DB::table('moderation_logs')->delete();
        DB::table('contact_access_logs')->delete();
        DB::table('procurement_agreements')->delete();
        DB::table('purchase_proposals')->delete();
        DB::table('farming_log_photos')->delete();
        DB::table('farming_logs')->delete();
        DB::table('harvest_listings')->delete();
        DB::table('crop_seasons')->delete();
        DB::table('production_area_documents')->delete();
        DB::table('production_areas')->delete();
        DB::table('farmer_profiles')->delete();
        DB::table('buyer_profiles')->delete();
        DB::table('administrative_units')->whereNotNull('parent_code')->delete();
        DB::table('administrative_units')->delete();
        DB::table('users')->delete();
    }

    private function seedPrerequisites(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'TG_MDT',
            'name' => 'Xã Mỹ Đức Tây',
            'level' => 'COMMUNE',
        ]);

        $this->farmerUserId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => Hash::make('secret'),
            'role' => 'FARMER',
            'full_name' => 'Nguyễn Văn Nông',
            'status' => 'ACTIVE',
        ]);

        $this->adminUserId = DB::table('users')->insertGetId([
            'phone' => '0999999999',
            'password' => Hash::make('adminsecret'),
            'role' => 'ADMIN',
            'full_name' => 'Quản Trị Viên',
            'status' => 'ACTIVE',
        ]);

        $this->productionAreaId = DB::table('production_areas')->insertGetId([
            'farmer_id' => $this->farmerUserId,
            'commune_code' => 'TG_MDT',
            'name' => 'Vườn Sầu Riêng Lô 1',
            'area_value' => 2.50,
            'area_unit' => 'ha',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_can_create_production_area_document_and_admin_review(): void
    {
        $docId = DB::table('production_area_documents')->insertGetId([
            'production_area_id' => $this->productionAreaId,
            'document_name' => 'Giấy chứng nhận VietGAP 2026',
            'file_path' => 'documents/areas/cert_12345.pdf',
            'review_status' => 'PENDING',
            'created_at' => now(),
        ]);

        $this->assertDatabaseHas('production_area_documents', [
            'id' => $docId,
            'review_status' => 'PENDING',
            'reviewed_by' => null,
        ]);

        // Admin reviews the document
        DB::table('production_area_documents')->where('id', $docId)->update([
            'review_status' => 'REVIEWED',
            'reviewer_note' => 'Văn bản hợp lệ, có giá trị đến 2027',
            'reviewed_by' => $this->adminUserId,
            'reviewed_at' => now(),
        ]);

        $this->assertDatabaseHas('production_area_documents', [
            'id' => $docId,
            'review_status' => 'REVIEWED',
            'reviewed_by' => $this->adminUserId,
        ]);
    }

    public function test_can_create_crop_season_and_farming_logs_with_photos(): void
    {
        $seasonId = DB::table('crop_seasons')->insertGetId([
            'production_area_id' => $this->productionAreaId,
            'season_name' => 'Vụ Nghịch 2026',
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6 cơm vàng hạt lép',
            'category' => 'Trái cây nhiệt đới',
            'start_date' => '2026-01-15',
            'expected_harvest_start' => '2026-05-20',
            'expected_harvest_end' => '2026-06-05',
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->assertDatabaseHas('crop_seasons', [
            'id' => $seasonId,
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6 cơm vàng hạt lép',
        ]);

        $activityChips = ['WATERING', 'FERTILIZING', 'PEST_CONTROL', 'WEEDING', 'HARVESTING', 'OTHER'];
        foreach ($activityChips as $idx => $chip) {
            $logId = DB::table('farming_logs')->insertGetId([
                'crop_season_id' => $seasonId,
                'log_date' => '2026-02-0' . ($idx + 1),
                'activity_type' => $chip,
                'title' => "Công việc $chip",
                'description' => "Mô tả chi tiết nhật ký thực địa $chip",
                'created_at' => now(),
            ]);

            DB::table('farming_log_photos')->insert([
                'farming_log_id' => $logId,
                'photo_url' => "photos/logs/{$seasonId}_{$chip}.jpg",
                'caption' => "Ảnh minh chứng $chip",
                'sort_order' => 1,
            ]);

            $this->assertDatabaseHas('farming_logs', ['id' => $logId, 'activity_type' => $chip]);
            $this->assertDatabaseHas('farming_log_photos', ['farming_log_id' => $logId]);
        }
    }

    public function test_rejects_harvest_start_before_start_date(): void
    {
        $this->expectException(QueryException::class);
        DB::table('crop_seasons')->insert([
            'production_area_id' => $this->productionAreaId,
            'season_name' => 'Vụ Sai Ngày',
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6',
            'category' => 'Trái cây',
            'start_date' => '2026-05-01',
            'expected_harvest_start' => '2026-04-01', // Before start_date!
            'expected_harvest_end' => '2026-05-15',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_rejects_harvest_end_before_harvest_start(): void
    {
        $this->expectException(QueryException::class);
        DB::table('crop_seasons')->insert([
            'production_area_id' => $this->productionAreaId,
            'season_name' => 'Vụ Sai Kết Thúc',
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6',
            'category' => 'Trái cây',
            'start_date' => '2026-01-01',
            'expected_harvest_start' => '2026-05-15',
            'expected_harvest_end' => '2026-05-10', // Before expected_harvest_start!
            'status' => 'ACTIVE',
        ]);
    }

    public function test_enforces_on_delete_restrict_on_production_area_with_active_crop_season(): void
    {
        DB::table('crop_seasons')->insert([
            'production_area_id' => $this->productionAreaId,
            'season_name' => 'Vụ Mùa 2026',
            'crop_name' => 'Bưởi da xanh',
            'variety' => 'Da xanh Bến Tre',
            'category' => 'Cây có múi',
            'start_date' => '2026-01-01',
            'expected_harvest_start' => '2026-06-01',
            'expected_harvest_end' => '2026-06-20',
            'status' => 'ACTIVE',
        ]);

        // Trying to delete production area MUST fail because crop_seasons preserves history
        $this->expectException(QueryException::class);
        DB::table('production_areas')->where('id', $this->productionAreaId)->delete();
    }

    public function test_enforces_on_delete_cascade_from_crop_season_to_farming_logs_and_photos(): void
    {
        $seasonId = DB::table('crop_seasons')->insertGetId([
            'production_area_id' => $this->productionAreaId,
            'season_name' => 'Vụ Xóa Tầng',
            'crop_name' => 'Mít Thái',
            'variety' => 'Siêu sớm',
            'category' => 'Trái cây',
            'start_date' => '2026-01-01',
            'expected_harvest_start' => '2026-04-01',
            'expected_harvest_end' => '2026-04-15',
            'status' => 'ACTIVE',
        ]);

        $logId = DB::table('farming_logs')->insertGetId([
            'crop_season_id' => $seasonId,
            'log_date' => '2026-02-01',
            'activity_type' => 'WATERING',
            'title' => 'Tưới tiêu',
            'description' => 'Tưới nước định kỳ',
        ]);

        DB::table('farming_log_photos')->insert([
            'farming_log_id' => $logId,
            'photo_url' => 'photos/test.jpg',
        ]);

        // Deleting crop season should cascade delete farming_logs and photos
        DB::table('crop_seasons')->where('id', $seasonId)->delete();

        $this->assertDatabaseMissing('crop_seasons', ['id' => $seasonId]);
        $this->assertDatabaseMissing('farming_logs', ['id' => $logId]);
        $this->assertDatabaseMissing('farming_log_photos', ['farming_log_id' => $logId]);
    }

    public function test_enforces_on_delete_set_null_on_reviewed_by_when_admin_deleted(): void
    {
        $docId = DB::table('production_area_documents')->insertGetId([
            'production_area_id' => $this->productionAreaId,
            'document_name' => 'Văn bản test',
            'file_path' => 'docs/test.pdf',
            'review_status' => 'REVIEWED',
            'reviewed_by' => $this->adminUserId,
        ]);

        // Deleting admin user should set reviewed_by to NULL
        DB::table('users')->where('id', $this->adminUserId)->delete();

        $this->assertDatabaseHas('production_area_documents', [
            'id' => $docId,
            'reviewed_by' => null,
        ]);
    }
}
