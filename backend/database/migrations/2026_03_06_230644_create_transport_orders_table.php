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
        Schema::create('transport_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', length: 20)->unique(true);
            $table->unsignedBigInteger('driver_id');
            $table->string('origin_address', length: 255);
            $table->string('destination_address', length: 255);
            $table->text('cargo_description');
            $table->decimal('weight_kg', total: 10, places: 2)->nullable();
            $table->enum('status', ['pending', 'collecting', 'collected', 'delivering', 'delivered']);
            $table->date('scheduled_date');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('driver_id')->references('id')->on('drivers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transport_orders');
    }
};
