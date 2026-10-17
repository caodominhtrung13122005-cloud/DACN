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
        Schema::create('production_area_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_area_id')
                ->constrained('production_areas')
                ->onDelete('cascade');
            $table->string('document_name', 150);
            $table->string('file_path', 255);
            $table->enum('review_status', ['PENDING', 'REVIEWED', 'REJECTED'])->default('PENDING');
            $table->string('reviewer_note', 255)->nullable();
            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_area_documents');
    }
};
