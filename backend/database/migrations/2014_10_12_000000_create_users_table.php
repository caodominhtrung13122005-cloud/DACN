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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 20)->unique();
            $table->string('email', 150)->nullable()->unique();
            $table->string('password', 255);
            $table->enum('role', ['FARMER', 'BUYER', 'ADMIN']);
            $table->enum('account_type', ['INDIVIDUAL', 'COOPERATIVE'])->nullable();
            $table->string('full_name', 100);
            $table->enum('status', ['ACTIVE', 'SUSPENDED', 'PENDING_REVIEW'])->default('ACTIVE');
            $table->rememberToken();
            $table->timestamps();

            $table->index(['role', 'status'], 'idx_users_role_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
