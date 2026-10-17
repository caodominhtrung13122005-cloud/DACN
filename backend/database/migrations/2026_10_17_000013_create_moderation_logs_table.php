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
        Schema::create('moderation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->enum('target_type', ['HARVEST_LISTING', 'PRODUCTION_AREA', 'USER']);
            $table->unsignedBigInteger('target_id');
            $table->enum('action', [
                'HIDE',
                'RESTORE',
                'FLAG',
                'APPROVE_DOC',
                'REJECT_DOC',
                'SUSPEND_USER',
            ]);
            $table->string('reason', 255);
            $table->timestamp('created_at')->useCurrent();

            $table->index(['target_type', 'target_id'], 'idx_moderation_target');
            $table->index('admin_id', 'idx_moderation_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moderation_logs');
    }
};
