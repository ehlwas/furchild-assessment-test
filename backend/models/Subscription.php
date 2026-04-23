<?php

namespace app\models;

use yii\db\ActiveRecord;

class Subscription extends ActiveRecord
{
    public static function tableName()
    {
        return 'subscriptions';
    }

    public function rules()
    {
        return [
            [['user_id', 'meal_plan_id', 'start_date'], 'required'],
            [['user_id', 'meal_plan_id'], 'integer'],
            [['start_date'], 'date', 'format' => 'php:Y-m-d'],
            [['status'], 'in', 'range' => ['active', 'paused', 'cancelled']],
            
            // Validate that the meal plan exists and is active
            ['meal_plan_id', 'validateMealPlan'],
            
            // Validate that the user doesn't already have an active subscription
            ['user_id', 'validateActiveSubscription', 'on' => 'create'],
        ];
    }

    public function validateMealPlan($attribute, $params)
    {
        $mealPlan = MealPlan::findOne($this->$attribute);
        if (!$mealPlan) {
            $this->addError($attribute, 'The selected meal plan does not exist.');
        } elseif (!$mealPlan->is_active) {
            $this->addError($attribute, 'The selected meal plan is not active.');
        }
    }

    public function validateActiveSubscription($attribute, $params)
    {
        $existingActive = static::find()
            ->where(['user_id' => $this->$attribute, 'status' => 'active'])
            ->exists();
            
        if ($existingActive) {
            $this->addError($attribute, 'This user already has an active subscription.');
        }
    }

    // Relation to MealPlan
    public function getMealPlan()
    {
        return $this->hasOne(MealPlan::class, ['id' => 'meal_plan_id']);
    }
    
    // Override fields to include the meal plan relation when converting to JSON
    public function extraFields()
    {
        return ['mealPlan'];
    }
}
