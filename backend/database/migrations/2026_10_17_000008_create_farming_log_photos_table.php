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
        Schema::create('farming_log_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farming_log_id')
                ->constrained('farming_logs')
                ->onDelete('cascade');
            $table->string('photo_url', 255);
            $table->string('caption', 150)->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farming_log_photos');
    }
};
