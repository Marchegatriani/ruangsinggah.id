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
    Schema::create('bookings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained(); // Siapa yang sewa
        $table->foreignId('kost_id')->constrained(); // Kost mana
        $table->string('booking_code')->unique();    // Contoh: RS-2026-001
        $table->integer('total_price');
        $table->enum('status', ['pending', 'success', 'cancelled'])->default('pending');
        $table->string('payment_method')->nullable();
        $table->date('start_date');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
