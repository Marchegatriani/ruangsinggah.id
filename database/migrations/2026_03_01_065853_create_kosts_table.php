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
    Schema::create('kosts', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->enum('type', ['Putra', 'Putri', 'Campur']);
        $table->text('description')->nullable();
        $table->decimal('price', 15, 2); // Harga terendah (untuk filter)
        $table->text('address');
        $table->decimal('latitude', 10, 8)->nullable();
        $table->decimal('longitude', 11, 8)->nullable();
        $table->boolean('is_verified')->default(false);

        // Kolom JSON untuk data kompleks
        $table->json('roomTypes')->nullable(); 
        $table->json('facilities')->nullable();
        $table->json('rules')->nullable();
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kosts');
    }
};
