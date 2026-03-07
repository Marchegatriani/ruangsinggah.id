<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DatabaseProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DatabaseProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DatabaseKost/Index', [
            'products' => DatabaseProduct::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/DatabaseKost/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campus'      => 'required|string|max:255',
            'city'        => 'required|string|max:255',
            'area'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'total_data'  => 'required|integer',
            'description' => 'required|string',
            'file_type'   => 'required|in:upload,link',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            // Jika upload maka harus file, jika link maka harus string URL
            'file_path'   => $request->file_type === 'upload' ? 'required|file|max:10240' : 'required|string',
        ]);

        // Handle Cover Image Upload
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('databases/covers', 'public');
        }

        // Handle Database File (Upload atau Link)
        if ($request->file_type === 'upload' && $request->hasFile('file_path')) {
            $validated['file_path'] = $request->file('file_path')->store('databases/files', 'public');
        } else {
            $validated['file_path'] = $request->file_path; // Simpan string link
        }

        DatabaseProduct::create($validated);

        return redirect()->route('admin.database.index')->with('success', 'Produk database berhasil diterbitkan.');
    }

    public function edit(DatabaseProduct $database)
    {
        return Inertia::render('Admin/DatabaseKost/Edit', [
            'product' => $database
        ]);
    }

    public function update(Request $request, DatabaseProduct $database)
    {
        $validated = $request->validate([
            'campus'      => 'required|string|max:255',
            'city'        => 'required|string|max:255',
            'area'        => 'required|string|max:255',
            'price'       => 'required|numeric',
            'total_data'  => 'required|integer',
            'description' => 'required|string',
            'file_type'   => 'required|in:upload,link',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Update Cover Image & Hapus yang lama
        if ($request->hasFile('cover_image')) {
            if ($database->cover_image) Storage::disk('public')->delete($database->cover_image);
            $validated['cover_image'] = $request->file('cover_image')->store('databases/covers', 'public');
        }

        // Update File Path
        if ($request->file_type === 'upload') {
            if ($request->hasFile('file_path')) {
                // Hapus file lama jika sebelumnya tipe upload juga
                if ($database->file_type === 'upload' && $database->file_path) {
                    Storage::disk('public')->delete($database->file_path);
                }
                $validated['file_path'] = $request->file('file_path')->store('databases/files', 'public');
            }
        } else {
            // Jika berubah ke tipe link, hapus file lama jika ada
            if ($database->file_type === 'upload' && $database->file_path) {
                Storage::disk('public')->delete($database->file_path);
            }
            $validated['file_path'] = $request->file_path;
        }

        $database->update($validated);

        return redirect()->route('admin.database.index')->with('success', 'Data database berhasil diperbarui.');
    }

    public function destroy(DatabaseProduct $database)
    {
        // Bersihkan semua file di storage sebelum hapus record
        if ($database->cover_image) Storage::disk('public')->delete($database->cover_image);
        if ($database->file_type === 'upload' && $database->file_path) {
            Storage::disk('public')->delete($database->file_path);
        }

        $database->delete();

        return redirect()->back()->with('success', 'Database berhasil dihapus permanen.');
    }
}