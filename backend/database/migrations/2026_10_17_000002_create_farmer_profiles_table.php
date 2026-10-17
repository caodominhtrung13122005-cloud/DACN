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
        Schema::create('farmer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->unique()
                ->constrained('users')
                ->onDelete('restrict');
            $table->string('farm_name', 150);
            $table->string('contact_person', 100);
            $table->string('phone_contact', 20);
            $table->string('zalo_phone', 20)->nullable();
            $table->string('facebook_url', 255)->nullable();
            $table->string('commune_code', 20);
            $table->foreign('commune_code', 'fk_farmer_profiles_commune')
                ->references('code')
                ->on('administrative_units')
                ->onDelete('restrict');
            $table->string('address_detail', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farmer_profiles');
    }
};
