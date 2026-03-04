<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('database_products', function (Blueprint $table) {
            $table->id();
            $table->string('campus');
            $table->string('city');
            $table->string('area');
            $table->decimal('price', 12, 2);
            $table->integer('total_data');
            $table->text('description');
            $table->string('cover_image')->nullable();
            $table->enum('file_type', ['upload', 'link'])->default('upload');
            $table->string('file_path')->nullable();
            $table->timestamps();
        });
    }

    public function down() { Schema::dropIfExists('database_products'); }
};