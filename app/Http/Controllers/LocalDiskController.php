<?php

namespace App\Http\Controllers;

use App\Models\LocalDisk;
use Illuminate\Http\Request;

class LocalDiskController extends Controller
{
    public function index()
    {
        return response()->json(LocalDisk::get());
    }


    public function storeFolder(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
        ]);

        LocalDisk::create([
            ...$attributes,
            'type' => 'folder',
            'parent_id' => 1
        ]);

        return response()->json(['message' => 'directory created successfully!']);
    }

    public function storeFile(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
        ]);

        LocalDisk::create([
            ...$attributes,
            'type' => 'file',
            'parent_id' => 1
        ]);

        return response()->json(['message' => 'file created successfully!']);
    }
}
