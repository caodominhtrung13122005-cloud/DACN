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
        Schema::create('crop_seasons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_area_id')
                ->constrained('production_areas')
                ->onDelete('restrict');
            $table->string('season_name', 100);
            $table->string('crop_name', 100);
            $table->string('variety', 100);
            $table->string('category', 50);
            $table->date('start_date');
            $table->date('expected_harvest_start');
            $table->date('expected_harvest_end');
            $table->enum('status', ['PLANNING', 'ACTIVE', 'HARVESTING', 'COMPLETED', 'CANCELLED'])->default('ACTIVE');
            $table->timestamps();

            $table->index('production_area_id', 'idx_seasons_prod_area');
            $table->index(['expected_harvest_start', 'expected_harvest_end'], 'idx_seasons_harvest_window');
        });

        DB::statement("ALTER TABLE crop_seasons ADD CONSTRAINT chk_season_dates CHECK (expected_harvest_start >= start_date AND expected_harvest_end >= expected_harvest_start)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_seasons');
    }
};
