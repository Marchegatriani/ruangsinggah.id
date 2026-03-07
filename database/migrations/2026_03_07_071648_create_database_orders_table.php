<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('database_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('database_product_id')->constrained()->onDelete('cascade');
            $table->string('order_code')->unique(); // Contoh: DB-2026-001
            $table->integer('amount');
            $table->enum('status', ['pending', 'success', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('transfer_proof')->nullable(); // Untuk menyimpan path foto bukti transfer
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('database_orders');
    }
};