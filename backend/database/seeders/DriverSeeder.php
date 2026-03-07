<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $drivers = [
            [
                'name' => 'Matheus',
                'cpf' => '970.738.280-56',
                'cnh_number' => '46851660521',
                'cnh_category' => 'A',
                'phone' => '(55) +48 96163-0318',
            ],
            [
                'name' => 'Marco',
                'cpf' => '803.061.260-52',
                'cnh_number' => '09758054719',
                'cnh_category' => 'E',
                'phone' => '(55) +48 91544-7320',
            ],
            [
                'name' => 'Lucas',
                'cpf' => '852.291.990-91',
                'cnh_number' => '43023512706',
                'cnh_category' => 'C',
                'phone' => '(55) +48 96987-4390',
            ],
            [
                'name' => 'João',
                'cpf' => '497.813.150-24',
                'cnh_number' => '08850096134',
                'cnh_category' => 'B',
                'phone' => '(55) +48 98139-2360',
            ],
            [
                'name' => 'Paulo',
                'cpf' => '856.014.690-32',
                'cnh_number' => '40457118860',
                'cnh_category' => 'B',
                'phone' => '(55) +48 98582-6390',
            ],
        ];
        foreach ($drivers as $driver) {
            Driver::create($driver);
        }
    }
}
