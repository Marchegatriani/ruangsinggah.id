<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mitra_requests', function (Blueprint $table) {
            $table->id();
            $table->string('owner_name');
            $table->string('phone');
            $table->string('kost_name');
            $table->string('kost_type');
            $table->integer('empty_rooms');
            $table->text('address');
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mitra_requests');
    }
};
