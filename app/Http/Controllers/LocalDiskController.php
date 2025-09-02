<?php

namespace App\Http\Controllers;

use App\Models\LocalDisk;
use Illuminate\Http\Request;

class LocalDiskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(LocalDisk::get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LocalDisk $localDisk)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LocalDisk $localDisk)
    {
        //
    }
}
