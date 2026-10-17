<?php

namespace Tests\Feature;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FoundationDatabaseTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->cleanDatabase();
    }

    protected function tearDown(): void
    {
        $this->cleanDatabase();
        parent::tearDown();
    }

    private function cleanDatabase(): void
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

    public function test_can_insert_valid_administrative_units_and_users(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'TG',
            'name' => 'Tỉnh Tiền Giang',
            'level' => 'PROVINCE',
            'parent_code' => null,
            'historical_names' => null,
            'centroid_latitude' => null,
            'centroid_longitude' => null,
        ]);

        DB::table('administrative_units')->insert([
            'code' => 'TG_MDT',
            'name' => 'Xã Mỹ Đức Tây',
            'level' => 'COMMUNE',
            'parent_code' => 'TG',
            'historical_names' => 'Huyện Cái Bè, Tiền Giang',
            'centroid_latitude' => 10.3541234,
            'centroid_longitude' => 105.9876543,
        ]);

        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'email' => 'farmer1@mekagreen.test',
            'password' => Hash::make('Secret123!'),
            'role' => 'FARMER',
            'account_type' => 'INDIVIDUAL',
            'full_name' => 'Nguyễn Văn Nông',
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $buyerId = DB::table('users')->insertGetId([
            'phone' => '0987654321',
            'email' => null,
            'password' => Hash::make('Secret123!'),
            'role' => 'BUYER',
            'account_type' => null,
            'full_name' => 'Công Ty Thu Mua Mekong',
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->assertDatabaseHas('administrative_units', ['code' => 'TG_MDT']);
        $this->assertDatabaseHas('users', ['id' => $farmerId, 'role' => 'FARMER']);
        $this->assertDatabaseHas('users', ['id' => $buyerId, 'email' => null]);
    }

    public function test_can_insert_farmer_buyer_and_production_area(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'TG_MDT',
            'name' => 'Xã Mỹ Đức Tây',
            'level' => 'COMMUNE',
            'parent_code' => null,
        ]);

        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => Hash::make('Secret123!'),
            'role' => 'FARMER',
            'full_name' => 'Nguyễn Văn Nông',
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $buyerId = DB::table('users')->insertGetId([
            'phone' => '0987654321',
            'password' => Hash::make('Secret123!'),
            'role' => 'BUYER',
            'full_name' => 'Vựa Mua',
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('farmer_profiles')->insert([
            'user_id' => $farmerId,
            'farm_name' => 'Vườn Sầu Riêng Chín Sớm',
            'contact_person' => 'Nguyễn Văn Nông',
            'phone_contact' => '0912345678',
            'commune_code' => 'TG_MDT',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('buyer_profiles')->insert([
            'user_id' => $buyerId,
            'company_name' => 'Vựa Thu Mua Trái Cây Miền Tây',
            'buyer_type' => 'WHOLESALER',
            'commune_code' => 'TG_MDT',
            'address_detail' => 'Quốc lộ 1A',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('production_areas')->insert([
            'farmer_id' => $farmerId,
            'commune_code' => 'TG_MDT',
            'name' => 'Vùng trồng Lô 1',
            'area_value' => 2.50,
            'area_unit' => 'ha',
            'exact_latitude' => 10.3550000,
            'exact_longitude' => 105.9880000,
            'is_gps_public' => 0,
            'status' => 'ACTIVE',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->assertDatabaseHas('farmer_profiles', ['user_id' => $farmerId]);
        $this->assertDatabaseHas('buyer_profiles', ['user_id' => $buyerId]);
        $this->assertDatabaseHas('production_areas', ['farmer_id' => $farmerId, 'is_gps_public' => 0]);
    }

    public function test_rejects_duplicate_phone_number(): void
    {
        DB::table('users')->insert([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'FARMER',
            'full_name' => 'User 1',
            'status' => 'ACTIVE',
        ]);

        $this->expectException(QueryException::class);
        DB::table('users')->insert([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'BUYER',
            'full_name' => 'User 2',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_rejects_invalid_enum_role(): void
    {
        $this->expectException(QueryException::class);
        DB::table('users')->insert([
            'phone' => '0933333333',
            'password' => 'secret',
            'role' => 'INVALID_ROLE',
            'full_name' => 'Invalid',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_rejects_invalid_commune_code_foreign_key(): void
    {
        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'FARMER',
            'full_name' => 'Farmer',
            'status' => 'ACTIVE',
        ]);

        $this->expectException(QueryException::class);
        DB::table('production_areas')->insert([
            'farmer_id' => $farmerId,
            'commune_code' => 'UNKNOWN_COMMUNE',
            'name' => 'Invalid Area',
            'area_value' => 1.0,
            'area_unit' => 'ha',
            'status' => 'ACTIVE',
        ]);
    }

    public function test_rejects_out_of_range_latitude(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'COMM_1',
            'name' => 'Xã 1',
            'level' => 'COMMUNE',
        ]);

        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'FARMER',
            'full_name' => 'Farmer',
            'status' => 'ACTIVE',
        ]);

        $this->expectException(QueryException::class);
        DB::table('production_areas')->insert([
            'farmer_id' => $farmerId,
            'commune_code' => 'COMM_1',
            'name' => 'Area Out Of Range',
            'area_value' => 1.0,
            'exact_latitude' => 95.0, // > 90
            'exact_longitude' => 105.0,
            'status' => 'ACTIVE',
        ]);
    }

    public function test_rejects_single_coordinate_when_pair_expected(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'COMM_1',
            'name' => 'Xã 1',
            'level' => 'COMMUNE',
        ]);

        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'FARMER',
            'full_name' => 'Farmer',
            'status' => 'ACTIVE',
        ]);

        $this->expectException(QueryException::class);
        DB::table('production_areas')->insert([
            'farmer_id' => $farmerId,
            'commune_code' => 'COMM_1',
            'name' => 'Area Single Coord',
            'area_value' => 1.0,
            'exact_latitude' => 10.0,
            'exact_longitude' => null,
            'status' => 'ACTIVE',
        ]);
    }

    public function test_enforces_on_delete_restrict_on_user_with_active_profile(): void
    {
        DB::table('administrative_units')->insert([
            'code' => 'COMM_1',
            'name' => 'Xã 1',
            'level' => 'COMMUNE',
        ]);

        $farmerId = DB::table('users')->insertGetId([
            'phone' => '0912345678',
            'password' => 'secret',
            'role' => 'FARMER',
            'full_name' => 'Farmer',
            'status' => 'ACTIVE',
        ]);

        DB::table('farmer_profiles')->insert([
            'user_id' => $farmerId,
            'farm_name' => 'Vườn Út Được',
            'contact_person' => 'Út Được',
            'phone_contact' => '0912345678',
            'commune_code' => 'COMM_1',
        ]);

        $this->expectException(QueryException::class);
        DB::table('users')->where('id', $farmerId)->delete();
    }
}
