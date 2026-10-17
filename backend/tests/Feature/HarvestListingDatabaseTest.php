<?php

namespace Tests\Feature;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class HarvestListingDatabaseTest extends TestCase
{
    private int $farmerUserId;
    private int $cropSeasonId;

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

        $productionAreaId = DB::table('production_areas')->insertGetId([
            'farmer_id' => $this->farmerUserId,
            'commune_code' => 'TG_MDT',
            'name' => 'Vườn Sầu Riêng Mỹ Đức Tây',
            'area_value' => 3.00,
            'area_unit' => 'ha',
            'status' => 'ACTIVE',
        ]);

        $this->cropSeasonId = DB::table('crop_seasons')->insertGetId([
            'production_area_id' => $productionAreaId,
            'season_name' => 'Vụ Nghịch 2026',
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6 cơm vàng hạt lép',
            'category' => 'Trái cây',
            'start_date' => '2026-01-01',
            'expected_harvest_start' => '2026-05-10',
            'expected_harvest_end' => '2026-05-25',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_can_create_harvest_listing_and_verify_stored_generated_available_quantity(): void
    {
        $listingId = DB::table('harvest_listings')->insertGetId([
            'code' => 'HL-2026-001',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 10000.00,
            'committed_quantity_kg' => 0.00,
            'reserved_quantity_kg' => 0.00,
            'expected_harvest_date' => '2026-05-15',
            'harvest_window_days' => 5,
            'packaging_spec' => 'Thùng carton 18kg lót xốp lưới',
            'reference_price' => '85.000 đ/kg',
            'status' => 'AVAILABLE',
            'moderation_status' => 'APPROVED',
            'trace_code' => 'MKG_TR_A1B2C3D4E5F6789012345678',
            'published_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Verify that available_quantity_kg was automatically computed and stored as 10000.00
        $listing = DB::table('harvest_listings')->where('id', $listingId)->first();
        $this->assertEquals('10000.00', $listing->available_quantity_kg);
        $this->assertEquals('AVAILABLE', $listing->status);
        $this->assertEquals('APPROVED', $listing->moderation_status);

        // Simulate Soft Reserve (Agreement created pending confirmation: reserved = 3500.00)
        DB::table('harvest_listings')->where('id', $listingId)->update([
            'reserved_quantity_kg' => 3500.00,
        ]);
        $listing = DB::table('harvest_listings')->where('id', $listingId)->first();
        $this->assertEquals('6500.00', $listing->available_quantity_kg);

        // Simulate Agreement CONFIRMED (committed = 3500.00, reserved = 0.00)
        DB::table('harvest_listings')->where('id', $listingId)->update([
            'committed_quantity_kg' => 3500.00,
            'reserved_quantity_kg' => 0.00,
            'status' => 'PARTIALLY_COMMITTED',
        ]);
        $listing = DB::table('harvest_listings')->where('id', $listingId)->first();
        $this->assertEquals('6500.00', $listing->available_quantity_kg);
        $this->assertEquals('PARTIALLY_COMMITTED', $listing->status);

        // Simulate remaining quantity confirmed (committed = 10000.00, available = 0.00)
        DB::table('harvest_listings')->where('id', $listingId)->update([
            'committed_quantity_kg' => 10000.00,
            'reserved_quantity_kg' => 0.00,
            'status' => 'FULLY_COMMITTED',
        ]);
        $listing = DB::table('harvest_listings')->where('id', $listingId)->first();
        $this->assertEquals('0.00', $listing->available_quantity_kg);
        $this->assertEquals('FULLY_COMMITTED', $listing->status);
    }

    public function test_rejects_non_positive_expected_quantity(): void
    {
        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->insert([
            'code' => 'HL-2026-INV1',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 0.00, // Invalid: must be > 0.00
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'status' => 'AVAILABLE',
            'moderation_status' => 'APPROVED',
            'trace_code' => 'TRACE_INV1_00000000000000000001',
        ]);
    }

    public function test_rejects_quantities_exceeding_ceiling_constraint(): void
    {
        $this->expectException(QueryException::class);
        // expected = 5000, committed = 3000, reserved = 3000 -> committed + reserved = 6000 > 5000!
        DB::table('harvest_listings')->insert([
            'code' => 'HL-2026-INV2',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'committed_quantity_kg' => 3000.00,
            'reserved_quantity_kg' => 3000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'status' => 'AVAILABLE',
            'moderation_status' => 'APPROVED',
            'trace_code' => 'TRACE_INV2_00000000000000000002',
        ]);
    }

    public function test_rejects_duplicate_listing_code(): void
    {
        DB::table('harvest_listings')->insert([
            'code' => 'HL-DUP-001',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'TRACE_DUP1_00000000000000000001',
        ]);

        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->insert([
            'code' => 'HL-DUP-001', // Duplicate code!
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 2000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'TRACE_DUP2_00000000000000000002',
        ]);
    }

    public function test_rejects_duplicate_trace_code(): void
    {
        DB::table('harvest_listings')->insert([
            'code' => 'HL-001',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'SHARED_TRACE_CODE_1234567890123',
        ]);

        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->insert([
            'code' => 'HL-002',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 2000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'SHARED_TRACE_CODE_1234567890123', // Duplicate trace_code!
        ]);
    }

    public function test_rejects_invalid_business_status_enum(): void
    {
        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->insert([
            'code' => 'HL-003',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'status' => 'INVALID_STATUS', // Not one of 5 locked statuses!
            'trace_code' => 'TRACE_STATUS_000000000000000001',
        ]);
    }

    public function test_rejects_invalid_moderation_status_enum(): void
    {
        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->insert([
            'code' => 'HL-004',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'moderation_status' => 'REJECTED', // Not APPROVED, FLAGGED, HIDDEN!
            'trace_code' => 'TRACE_MOD_000000000000000000001',
        ]);
    }

    public function test_enforces_on_delete_restrict_on_crop_season_with_active_listing(): void
    {
        DB::table('harvest_listings')->insert([
            'code' => 'HL-RESTRICT-01',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'TRACE_RESTRICT_0000000000000001',
        ]);

        // Attempting to delete crop_season MUST fail with ON DELETE RESTRICT
        $this->expectException(QueryException::class);
        DB::table('crop_seasons')->where('id', $this->cropSeasonId)->delete();
    }

    public function test_enforces_on_delete_restrict_on_farmer_user_with_active_listing(): void
    {
        DB::table('harvest_listings')->insert([
            'code' => 'HL-RESTRICT-02',
            'crop_season_id' => $this->cropSeasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 5000.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'trace_code' => 'TRACE_RESTRICT_0000000000000002',
        ]);

        // Attempting to delete farmer user MUST fail with ON DELETE RESTRICT
        $this->expectException(QueryException::class);
        DB::table('users')->where('id', $this->farmerUserId)->delete();
    }
}
