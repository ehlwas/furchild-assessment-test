<?php

namespace app\models;

use yii\db\ActiveRecord;

class MealPlan extends ActiveRecord
{
    public static function tableName()
    {
        return 'meal_plans';
    }

    public function rules()
    {
        return [
            [['name', 'price'], 'required'],
            [['price'], 'number'],
            [['is_active'], 'boolean'],
            [['description'], 'string'],
            [['name'], 'string', 'max' => 255],
        ];
    }
}
