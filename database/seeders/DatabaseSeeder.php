<?php

namespace Database\Seeders;

use App\Models\LocalDisk;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        LocalDisk::factory()->create([
            'name' => 'root',
            'type' => 'folder',
            'parent_id' => null,
        ]);
    }
}
