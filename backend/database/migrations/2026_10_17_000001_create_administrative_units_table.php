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
        Schema::create('administrative_units', function (Blueprint $table) {
            $table->string('code', 20)->primary();
            $table->string('name', 100);
            $table->enum('level', ['PROVINCE', 'COMMUNE']);
            $table->string('parent_code', 20)->nullable();
            $table->string('historical_names', 255)->nullable();
            $table->decimal('centroid_latitude', 10, 7)->nullable();
            $table->decimal('centroid_longitude', 10, 7)->nullable();

            $table->foreign('parent_code', 'fk_admin_units_parent')
                ->references('code')
                ->on('administrative_units')
                ->onDelete('restrict');

            $table->index('parent_code', 'idx_admin_parent');
            $table->index('level', 'idx_admin_level');
        });

        DB::statement("ALTER TABLE administrative_units ADD CONSTRAINT chk_admin_centroid_pair CHECK ((centroid_latitude IS NULL AND centroid_longitude IS NULL) OR (centroid_latitude IS NOT NULL AND centroid_longitude IS NOT NULL AND centroid_latitude BETWEEN -90 AND 90 AND centroid_longitude BETWEEN -180 AND 180))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrative_units');
    }
};
