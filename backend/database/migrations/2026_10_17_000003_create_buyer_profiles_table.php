<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('buyer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->unique()
                ->constrained('users')
                ->onDelete('restrict');
            $table->string('company_name', 150);
            $table->enum('buyer_type', [
                'TRADER',
                'PURCHASING_COMPANY',
                'WHOLESALER',
                'PROCESSOR',
                'EXPORTER',
                'COOPERATIVE_BUYER',
                'OTHER',
            ]);
            $table->string('commune_code', 20);
            $table->foreign('commune_code', 'fk_buyer_profiles_commune')
                ->references('code')
                ->on('administrative_units')
                ->onDelete('restrict');
            $table->string('address_detail', 255);
            $table->string('tax_code', 30)->nullable();
            $table->text('warehouse_info')->nullable();
            $table->text('target_crops')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyer_profiles');
    }
};
