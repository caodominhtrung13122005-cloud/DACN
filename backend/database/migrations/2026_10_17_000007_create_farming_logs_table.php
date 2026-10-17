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
        Schema::create('farming_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_season_id')
                ->constrained('crop_seasons')
                ->onDelete('cascade');
            $table->date('log_date');
            $table->enum('activity_type', [
                'WATERING',
                'FERTILIZING',
                'PEST_CONTROL',
                'WEEDING',
                'HARVESTING',
                'OTHER',
            ]);
            $table->string('title', 150);
            $table->text('description');
            $table->timestamp('created_at')->useCurrent();

            $table->index(['crop_season_id', 'log_date'], 'idx_farming_logs_season_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farming_logs');
    }
};
