<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;
use app\models\MealPlan;
use app\models\Subscription;

class SubscriptionController extends Controller
{
    // Enable CORS for our React frontend
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        return $behaviors;
    }

    /**
     * GET /meal-plans
     * Return ONLY active meal plans (is_active = 1)
     */
    public function actionMealPlans()
    {
        return MealPlan::find()->where(['is_active' => 1])->all();
    }

    /**
     * POST /subscriptions
     * Input: user_id, meal_plan_id, start_date
     */
    public function actionCreate()
    {
        $model = new Subscription();
        $model->scenario = 'create'; // Set scenario for specific validations
        
        // Load data from POST request (Yii's request parser handles JSON)
        $model->load(Yii::$app->request->post(), '');

        if ($model->validate() && $model->save()) {
            Yii::$app->response->statusCode = 201; // Created
            return [
                'success' => true,
                'message' => 'Subscription created successfully',
                'data' => $model
            ];
        }

        // Validation failed
        Yii::$app->response->statusCode = 422; // Unprocessable Entity
        return [
            'success' => false,
            'errors' => $model->getErrors()
        ];
    }

    /**
     * GET /subscriptions/{user_id}
     * Return user's current subscription including meal plan details
     */
    public function actionView($user_id)
    {
        $subscription = Subscription::find()
            ->with('mealPlan') // Eager load the relation
            ->where(['user_id' => $user_id, 'status' => 'active'])
            ->one();

        if (!$subscription) {
            throw new NotFoundHttpException('Active subscription not found for this user.');
        }

        // Return with the mealPlan relation included
        return $subscription->toArray([], ['mealPlan']);
    }

    /**
     * Handle OPTIONS requests for CORS
     */
    public function actionOptions()
    {
        Yii::$app->response->statusCode = 200;
    }
}
