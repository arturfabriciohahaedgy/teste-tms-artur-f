<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransportOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
        {
        $drivers = DB::table('drivers')->select('id')->get();
        $orders = [
            [
                'order_number' => '4124',
                'driver_id' => $drivers[0]->id,
                'origin_address' => 'Criciúma',
                'destination_address' => 'São José',
                'cargo_description' => 'Cargo pesado',
                'weight_kg' => 20.5,
                'status' => 'delivered',
                'scheduled_date' => date('2024-03-06'),
                'notes' => null,
            ],
            [
                'order_number' => '49098',
                'driver_id' => $drivers[0]->id,
                'origin_address' => 'São José',
                'destination_address' => 'Criciúma',
                'cargo_description' => 'Cargo leve',
                'weight_kg' => 30.12,
                'status' => 'collecting',
                'scheduled_date' => date('2022-09-16'),
                'notes' => 'Atraso na coleta',
            ],
            [
                'order_number' => '24098',
                'driver_id' => $drivers[1]->id,
                'origin_address' => 'Tubarão',
                'destination_address' => 'Frankfurt',
                'cargo_description' => 'Cargo novo',
                'weight_kg' => null,
                'status' => 'collecting',
                'scheduled_date' => date('2022-09-16'),
                'notes' => 'Atraso na coleta',
            ],
            [
                'order_number' => '49099',
                'driver_id' => $drivers[1]->id,
                'origin_address' => 'Florianópolis',
                'destination_address' => 'Criciúma',
                'cargo_description' => 'Equipamentos eletrônicos',
                'weight_kg' => 12.45,
                'status' => 'pending',
                'scheduled_date' => date('2022-09-17'),
                'notes' => 'Aguardando confirmação',
            ],
            [
    'order_number' => '49100',
    'driver_id' => $drivers[2]->id,
    'origin_address' => 'Tubarão',
    'destination_address' => 'São José',
    'cargo_description' => 'Peças automotivas',
    'weight_kg' => 18.90,
    'status' => 'collected',
    'scheduled_date' => date('2022-09-18'),
    'notes' => 'Coleta realizada com sucesso',
],
[
    'order_number' => '49101',
    'driver_id' => $drivers[2]->id,
    'origin_address' => 'Araranguá',
    'destination_address' => 'Criciúma',
    'cargo_description' => 'Materiais de construção',
    'weight_kg' => 45.70,
    'status' => 'delivering',
    'scheduled_date' => date('2022-09-18'),
    'notes' => 'Entrega em andamento',
],
[
    'order_number' => '49102',
    'driver_id' => $drivers[3]->id,
    'origin_address' => 'Blumenau',
    'destination_address' => 'Florianópolis',
    'cargo_description' => 'Roupas e tecidos',
    'weight_kg' => 9.80,
    'status' => 'delivered',
    'scheduled_date' => date('2022-09-19'),
    'notes' => 'Entrega finalizada',
],
[
    'order_number' => '49103',
    'driver_id' => $drivers[3]->id,
    'origin_address' => 'Joinville',
    'destination_address' => 'Criciúma',
    'cargo_description' => 'Ferramentas industriais',
    'weight_kg' => 27.35,
    'status' => 'collecting',
    'scheduled_date' => date('2022-09-20'),
    'notes' => 'Motorista a caminho da coleta',
],
[
    'order_number' => '49104',
    'driver_id' => $drivers[4]->id,
    'origin_address' => 'Lages',
    'destination_address' => 'Tubarao',
    'cargo_description' => 'Produtos agrícolas',
    'weight_kg' => 33.10,
    'status' => 'pending',
    'scheduled_date' => date('2022-09-21'),
    'notes' => 'Pedido recém-criado',
],
[
    'order_number' => '49105',
    'driver_id' => $drivers[4]->id,
    'origin_address' => 'Criciúma',
    'destination_address' => 'Araranguá',
    'cargo_description' => 'Caixas de alimentos',
    'weight_kg' => 14.65,
    'status' => 'delivering',
    'scheduled_date' => date('2022-09-21'),
    'notes' => 'Entrega prevista para hoje',
]
        ];

        foreach ($orders as $order) {
            TransportOrder::create($order);
        }
    }
}
