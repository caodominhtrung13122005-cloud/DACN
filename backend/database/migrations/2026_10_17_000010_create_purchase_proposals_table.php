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
        Schema::create('purchase_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')
                ->constrained('harvest_listings')
                ->onDelete('restrict');
            $table->foreignId('buyer_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->foreignId('farmer_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->unsignedDecimal('proposed_quantity_kg', 12, 2);
            $table->string('proposed_price', 100);
            $table->date('pickup_date');
            $table->enum('pickup_method', ['AT_FARM', 'AT_COLLECTION_POINT'])->default('AT_FARM');
            $table->text('note')->nullable();
            $table->enum('status', ['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED'])->default('PENDING');
            $table->string('expired_reason', 255)->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();

            $table->index(['listing_id', 'status'], 'idx_proposals_listing_status');
            $table->index(['buyer_id', 'status'], 'idx_proposals_buyer');
            $table->index(['farmer_id', 'status'], 'idx_proposals_farmer');
        });

        DB::statement("ALTER TABLE purchase_proposals ADD CONSTRAINT chk_proposal_qty_positive CHECK (proposed_quantity_kg > 0.00)");
        DB::statement("ALTER TABLE purchase_proposals ADD CONSTRAINT chk_proposal_buyer_not_farmer CHECK (buyer_id != farmer_id)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_proposals');
    }
};
