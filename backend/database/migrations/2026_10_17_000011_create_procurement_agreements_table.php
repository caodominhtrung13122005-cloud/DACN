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
        Schema::create('procurement_agreements', function (Blueprint $table) {
            $table->id();
            $table->string('code', 30)->unique();
            $table->foreignId('proposal_id')
                ->unique()
                ->constrained('purchase_proposals')
                ->onDelete('restrict');
            $table->foreignId('listing_id')
                ->constrained('harvest_listings')
                ->onDelete('restrict');
            $table->foreignId('farmer_id')
                ->constrained('users')
                ->onDelete('restrict');
            $table->foreignId('buyer_id')
                ->constrained('users')
                ->onDelete('restrict');

            // Snapshot of agreed terms
            $table->string('agreed_crop_name', 100);
            $table->string('agreed_variety', 100);
            $table->unsignedDecimal('agreed_quantity_kg', 12, 2);
            $table->string('agreed_price', 100);
            $table->date('agreed_pickup_date');
            $table->string('agreed_pickup_method', 50);
            $table->string('agreed_packaging', 255);
            $table->text('agreed_notes')->nullable();

            // Dual independent confirmation timestamps
            $table->timestamp('farmer_confirmed_at')->nullable();
            $table->timestamp('buyer_confirmed_at')->nullable();
            $table->timestamp('confirmed_at')->nullable();

            // Status and cancellation metadata
            $table->enum('status', ['PENDING_CONFIRMATION', 'CONFIRMED', 'CANCELLED'])
                ->default('PENDING_CONFIRMATION');
            $table->enum('cancelled_by', ['FARMER', 'BUYER', 'SYSTEM'])->nullable();
            $table->foreignId('cancelled_by_user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('restrict');
            $table->string('cancellation_reason', 150)->nullable();
            $table->text('cancellation_note')->nullable();
            $table->timestamp('cancelled_at')->nullable();

            $table->timestamps();

            // Indexes per ERD specification
            $table->index(['listing_id', 'status'], 'idx_agreements_listing_status');
            $table->index(['farmer_id', 'status'], 'idx_agreements_farmer_status');
            $table->index(['buyer_id', 'status'], 'idx_agreements_buyer_status');
        });

        DB::statement("ALTER TABLE procurement_agreements ADD CONSTRAINT chk_agreement_qty_positive CHECK (agreed_quantity_kg > 0.00)");
        DB::statement("ALTER TABLE procurement_agreements ADD CONSTRAINT chk_agreement_confirmed_state CHECK ((status = 'CONFIRMED' AND farmer_confirmed_at IS NOT NULL AND buyer_confirmed_at IS NOT NULL AND confirmed_at IS NOT NULL) OR (status != 'CONFIRMED'))");
        DB::statement("ALTER TABLE procurement_agreements ADD CONSTRAINT chk_agreement_cancelled_state CHECK ((status = 'CANCELLED' AND cancelled_at IS NOT NULL AND cancelled_by IS NOT NULL AND cancellation_reason IS NOT NULL) OR (status != 'CANCELLED'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_agreements');
    }
};
