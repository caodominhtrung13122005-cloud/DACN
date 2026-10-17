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
        Schema::create('production_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->string('commune_code', 20);
            $table->foreign('commune_code', 'fk_production_areas_commune')
                ->references('code')
                ->on('administrative_units')
                ->onDelete('restrict');
            $table->string('name', 150);
            $table->string('internal_code', 50)->nullable();
            $table->string('certified_area_code', 50)->nullable();
            $table->unsignedDecimal('area_value', 8, 2);
            $table->enum('area_unit', ['ha', 'm2'])->default('ha');
            $table->decimal('exact_latitude', 10, 7)->nullable();
            $table->decimal('exact_longitude', 10, 7)->nullable();
            $table->boolean('is_gps_public')->default(false);
            $table->string('farming_standard', 150)->nullable();
            $table->enum('status', ['ACTIVE', 'INACTIVE'])->default('ACTIVE');
            $table->timestamps();

            $table->index('farmer_id', 'idx_prod_areas_farmer');
            $table->index('commune_code', 'idx_prod_areas_commune');
        });

        DB::statement("ALTER TABLE production_areas ADD CONSTRAINT chk_prod_area_gps_pair CHECK ((exact_latitude IS NULL AND exact_longitude IS NULL) OR (exact_latitude IS NOT NULL AND exact_longitude IS NOT NULL AND exact_latitude BETWEEN -90 AND 90 AND exact_longitude BETWEEN -180 AND 180))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_areas');
    }
};
