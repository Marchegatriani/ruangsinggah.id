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
        $table->text('address');
        $table->decimal('latitude', 11, 8)->nullable();
        $table->decimal('longitude', 11, 8)->nullable();
        $table->decimal('price', 12, 2);
        $table->boolean('is_verified')->default(false);
        $table->string('type'); // Putra / Putri
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
