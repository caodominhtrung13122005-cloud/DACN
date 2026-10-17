<?php

namespace Tests\Feature;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProcurementDatabaseTest extends TestCase
{
    private int $farmerUserId;
    private int $buyerUserId;
    private int $adminUserId;
    private int $listingId;

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

        $this->buyerUserId = DB::table('users')->insertGetId([
            'phone' => '0987654321',
            'password' => Hash::make('secret'),
            'role' => 'BUYER',
            'full_name' => 'Công Ty Nông Sản Mekong',
            'status' => 'ACTIVE',
        ]);

        $this->adminUserId = DB::table('users')->insertGetId([
            'phone' => '0999999999',
            'password' => Hash::make('secret'),
            'role' => 'ADMIN',
            'full_name' => 'Quản Trị Viên',
            'status' => 'ACTIVE',
        ]);

        $areaId = DB::table('production_areas')->insertGetId([
            'farmer_id' => $this->farmerUserId,
            'commune_code' => 'TG_MDT',
            'name' => 'Vườn Sầu Riêng Lô 1',
            'area_value' => 2.50,
            'status' => 'ACTIVE',
        ]);

        $seasonId = DB::table('crop_seasons')->insertGetId([
            'production_area_id' => $areaId,
            'season_name' => 'Vụ Nghịch 2026',
            'crop_name' => 'Sầu riêng',
            'variety' => 'Ri6 cơm vàng hạt lép',
            'category' => 'Trái cây',
            'start_date' => '2026-01-01',
            'expected_harvest_start' => '2026-05-10',
            'expected_harvest_end' => '2026-05-25',
            'status' => 'ACTIVE',
        ]);

        $this->listingId = DB::table('harvest_listings')->insertGetId([
            'code' => 'HL-2026-PROC',
            'crop_season_id' => $seasonId,
            'farmer_id' => $this->farmerUserId,
            'expected_quantity_kg' => 10000.00,
            'committed_quantity_kg' => 0.00,
            'reserved_quantity_kg' => 0.00,
            'expected_harvest_date' => '2026-05-15',
            'packaging_spec' => 'Thùng 18kg',
            'reference_price' => '85.000 đ/kg',
            'status' => 'AVAILABLE',
            'moderation_status' => 'APPROVED',
            'trace_code' => 'TRACE_PROC_0000000000000000001',
        ]);
    }

    public function test_can_complete_proposal_and_dual_confirmed_agreement_lifecycle(): void
    {
        // 1. Buyer submits purchase proposal
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 4000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'pickup_method' => 'AT_FARM',
            'note' => 'Thu gom tại vườn, đóng thùng chuẩn xuất khẩu',
            'status' => 'PENDING',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->assertDatabaseHas('purchase_proposals', [
            'id' => $proposalId,
            'status' => 'PENDING',
            'proposed_quantity_kg' => 4000.00,
        ]);

        // 2. Farmer accepts proposal
        DB::table('purchase_proposals')->where('id', $proposalId)->update([
            'status' => 'ACCEPTED',
            'responded_at' => now(),
        ]);

        // 3. System creates agreement (PENDING_CONFIRMATION) with snapshot terms
        $agreementId = DB::table('procurement_agreements')->insertGetId([
            'code' => 'AGR-2026-001',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6 cơm vàng hạt lép',
            'agreed_quantity_kg' => 4000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'PENDING_CONFIRMATION',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->assertDatabaseHas('procurement_agreements', [
            'id' => $agreementId,
            'status' => 'PENDING_CONFIRMATION',
            'farmer_confirmed_at' => null,
            'buyer_confirmed_at' => null,
        ]);

        // 4. Farmer confirms
        $now = now();
        DB::table('procurement_agreements')->where('id', $agreementId)->update([
            'farmer_confirmed_at' => $now,
        ]);

        // 5. Buyer confirms -> status becomes CONFIRMED
        DB::table('procurement_agreements')->where('id', $agreementId)->update([
            'buyer_confirmed_at' => $now,
            'confirmed_at' => $now,
            'status' => 'CONFIRMED',
        ]);

        $this->assertDatabaseHas('procurement_agreements', [
            'id' => $agreementId,
            'status' => 'CONFIRMED',
        ]);
        $agreement = DB::table('procurement_agreements')->where('id', $agreementId)->first();
        $this->assertNotNull($agreement->farmer_confirmed_at);
        $this->assertNotNull($agreement->buyer_confirmed_at);
        $this->assertNotNull($agreement->confirmed_at);
    }

    public function test_can_cancel_unconfirmed_agreement_with_cancellation_metadata(): void
    {
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 2500.00,
            'proposed_price' => '82.000 đ/kg',
            'pickup_date' => '2026-05-18',
            'pickup_method' => 'AT_FARM',
            'status' => 'ACCEPTED',
        ]);

        $agreementId = DB::table('procurement_agreements')->insertGetId([
            'code' => 'AGR-2026-CANCEL',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2500.00,
            'agreed_price' => '82.000 đ/kg',
            'agreed_pickup_date' => '2026-05-18',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'PENDING_CONFIRMATION',
        ]);

        // Cancel agreement by Farmer
        $cancelTime = now();
        DB::table('procurement_agreements')->where('id', $agreementId)->update([
            'status' => 'CANCELLED',
            'cancelled_by' => 'FARMER',
            'cancelled_by_user_id' => $this->farmerUserId,
            'cancellation_reason' => 'Không thống nhất được thời gian thu hoạch',
            'cancellation_note' => 'Thời tiết bất lợi lùi ngày thu hoạch',
            'cancelled_at' => $cancelTime,
        ]);

        $this->assertDatabaseHas('procurement_agreements', [
            'id' => $agreementId,
            'status' => 'CANCELLED',
            'cancelled_by' => 'FARMER',
            'cancelled_by_user_id' => $this->farmerUserId,
            'cancellation_reason' => 'Không thống nhất được thời gian thu hoạch',
        ]);
    }

    public function test_can_record_contact_access_log_and_moderation_log(): void
    {
        // Contact access log (authorized Buyer opens Farmer contact)
        $contactLogId = DB::table('contact_access_logs')->insertGetId([
            'user_id' => $this->buyerUserId,
            'harvest_listing_id' => $this->listingId,
            'contact_type' => 'PHONE',
            'ip_address' => '127.0.0.1',
            'accessed_at' => now(),
        ]);

        $this->assertDatabaseHas('contact_access_logs', [
            'id' => $contactLogId,
            'contact_type' => 'PHONE',
            'user_id' => $this->buyerUserId,
        ]);

        // Moderation log (Admin flags listing for review)
        $modLogId = DB::table('moderation_logs')->insertGetId([
            'admin_id' => $this->adminUserId,
            'target_type' => 'HARVEST_LISTING',
            'target_id' => $this->listingId,
            'action' => 'FLAG',
            'reason' => 'Yêu cầu cập nhật hình ảnh thực tế mùa vụ',
            'created_at' => now(),
        ]);

        $this->assertDatabaseHas('moderation_logs', [
            'id' => $modLogId,
            'action' => 'FLAG',
            'admin_id' => $this->adminUserId,
        ]);
    }

    public function test_rejects_non_positive_proposed_quantity(): void
    {
        $this->expectException(QueryException::class);
        DB::table('purchase_proposals')->insert([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 0.00, // Invalid: must be > 0.00
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'pickup_method' => 'AT_FARM',
            'status' => 'PENDING',
        ]);
    }

    public function test_rejects_buyer_and_farmer_being_same_user_in_proposal(): void
    {
        $this->expectException(QueryException::class);
        DB::table('purchase_proposals')->insert([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->farmerUserId, // Invalid: farmer proposing to himself!
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 1000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'pickup_method' => 'AT_FARM',
            'status' => 'PENDING',
        ]);
    }

    public function test_rejects_multiple_agreements_for_same_proposal(): void
    {
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 2000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'status' => 'ACCEPTED',
        ]);

        DB::table('procurement_agreements')->insert([
            'code' => 'AGR-FIRST',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'PENDING_CONFIRMATION',
        ]);

        // Attempting to create a second agreement for the same proposal MUST fail (proposal_id UNIQUE)
        $this->expectException(QueryException::class);
        DB::table('procurement_agreements')->insert([
            'code' => 'AGR-SECOND',
            'proposal_id' => $proposalId, // Duplicate proposal_id!
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'PENDING_CONFIRMATION',
        ]);
    }

    public function test_rejects_confirmed_agreement_missing_confirmation_timestamps(): void
    {
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 2000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'status' => 'ACCEPTED',
        ]);

        // Attempting to insert status='CONFIRMED' without farmer_confirmed_at / buyer_confirmed_at MUST fail
        $this->expectException(QueryException::class);
        DB::table('procurement_agreements')->insert([
            'code' => 'AGR-INVALID-CONFIRM',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'CONFIRMED', // Invalid: confirmation timestamps are null!
            'farmer_confirmed_at' => null,
            'buyer_confirmed_at' => null,
            'confirmed_at' => null,
        ]);
    }

    public function test_rejects_cancelled_agreement_missing_cancellation_metadata(): void
    {
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 2000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'status' => 'ACCEPTED',
        ]);

        // Attempting to insert status='CANCELLED' without cancelled_by or cancellation_reason MUST fail
        $this->expectException(QueryException::class);
        DB::table('procurement_agreements')->insert([
            'code' => 'AGR-INVALID-CANCEL',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'CANCELLED', // Invalid: missing cancellation metadata!
            'cancelled_by' => null,
            'cancellation_reason' => null,
            'cancelled_at' => null,
        ]);
    }

    public function test_enforces_on_delete_restrict_on_listing_with_active_agreement(): void
    {
        $proposalId = DB::table('purchase_proposals')->insertGetId([
            'listing_id' => $this->listingId,
            'buyer_id' => $this->buyerUserId,
            'farmer_id' => $this->farmerUserId,
            'proposed_quantity_kg' => 2000.00,
            'proposed_price' => '80.000 đ/kg',
            'pickup_date' => '2026-05-16',
            'status' => 'ACCEPTED',
        ]);

        DB::table('procurement_agreements')->insert([
            'code' => 'AGR-RESTRICT-LISTING',
            'proposal_id' => $proposalId,
            'listing_id' => $this->listingId,
            'farmer_id' => $this->farmerUserId,
            'buyer_id' => $this->buyerUserId,
            'agreed_crop_name' => 'Sầu riêng',
            'agreed_variety' => 'Ri6',
            'agreed_quantity_kg' => 2000.00,
            'agreed_price' => '80.000 đ/kg',
            'agreed_pickup_date' => '2026-05-16',
            'agreed_pickup_method' => 'AT_FARM',
            'agreed_packaging' => 'Thùng 18kg',
            'status' => 'PENDING_CONFIRMATION',
        ]);

        // Attempting to delete harvest listing MUST fail (ON DELETE RESTRICT)
        $this->expectException(QueryException::class);
        DB::table('harvest_listings')->where('id', $this->listingId)->delete();
    }
}
