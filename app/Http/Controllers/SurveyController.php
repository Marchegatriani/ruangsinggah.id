<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    public function index()
    {
        return Inertia::render('User/SurveyService');
    }
}