<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('harvest_listings', function (Blueprint $table) {
            $table->id();
            $table->string('code', 30)->unique();
            $table->foreignId('crop_season_id')
                ->constrained('crop_seasons')
                ->onDelete('restrict');
            $table->foreignId('farmer_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->unsignedDecimal('expected_quantity_kg', 12, 2);
            $table->unsignedDecimal('committed_quantity_kg', 12, 2)->default(0.00);
            $table->unsignedDecimal('reserved_quantity_kg', 12, 2)->default(0.00);
            $table->decimal('available_quantity_kg', 12, 2)
                ->storedAs('expected_quantity_kg - committed_quantity_kg - reserved_quantity_kg');
            $table->date('expected_harvest_date');
            $table->unsignedSmallInteger('harvest_window_days')->default(5);
            $table->string('packaging_spec', 255);
            $table->string('reference_price', 100)->nullable();
            $table->enum('status', [
                'AVAILABLE',
                'PARTIALLY_COMMITTED',
                'FULLY_COMMITTED',
                'CLOSED',
                'CANCELLED'
            ])->default('AVAILABLE');
            $table->enum('moderation_status', [
                'APPROVED',
                'FLAGGED',
                'HIDDEN'
            ])->default('APPROVED');
            $table->string('trace_code', 32)->unique();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            // Indexes per ERD specification
            $table->index(['status', 'moderation_status', 'expected_harvest_date'], 'idx_listings_market');
            $table->index(['farmer_id', 'status'], 'idx_listings_farmer');
            $table->index('crop_season_id', 'idx_listings_crop_season');
        });

        // Add MySQL 8.0.30 CHECK constraints for quantity invariants
        DB::statement("ALTER TABLE harvest_listings ADD CONSTRAINT chk_listing_expected_positive CHECK (expected_quantity_kg > 0.00)");
        DB::statement("ALTER TABLE harvest_listings ADD CONSTRAINT chk_listing_quantity_ceiling CHECK ((committed_quantity_kg + reserved_quantity_kg) <= expected_quantity_kg)");
        DB::statement("ALTER TABLE harvest_listings ADD CONSTRAINT chk_listing_available_non_negative CHECK (available_quantity_kg >= 0.00)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_listings');
    }
};
