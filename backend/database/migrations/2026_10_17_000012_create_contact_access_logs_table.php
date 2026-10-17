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
        Schema::create('contact_access_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('harvest_listing_id')
                ->constrained('harvest_listings')
                ->onDelete('cascade');
            $table->enum('contact_type', ['PHONE', 'ZALO', 'FACEBOOK']);
            $table->string('ip_address', 45)->nullable();
            $table->timestamp('accessed_at')->useCurrent();

            $table->index(['user_id', 'harvest_listing_id'], 'idx_contact_logs_user_listing');
            $table->index('harvest_listing_id', 'idx_contact_logs_listing');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_access_logs');
    }
};
