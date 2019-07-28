<?php
namespace app\ebapi\model\course;

use basic\ModelBasic;
use service\JsonService;
use service\UtilService;
use traits\ModelTrait;


class CourseAction extends ModelBasic
{
	use ModelTrait;
	public static function getActionInfoLike($ActionInfo)
	{
		$model = new self();
		$model = $model->field('id,name,part,pid');
		if($ActionInfo['id'] && $ActionInfo['id']<>0)
		{
			$model = $model->where('id', $ActionInfo['id']);
		}
		if($ActionInfo['name']<>'')
			$model = $model->where('name','LIKE', '%'.$ActionInfo['name'].'%');
		if($ActionInfo['part']<>'')
			$model = $model->where('part','LIKE', '%'.$ActionInfo['part'].'%');
		if($ActionInfo['search']<>'')
			$model = $model->where('part|name','LIKE', '%'.$ActionInfo['search'].'%');
		$model = $model->where('is_del',1);
		//dump($model);
		return $model->select();
	}
	public static function getActionInfo()
	{
		$model = new self();
		$model = $model->field('id,name,part,pid');
		$model = $model->where('is_del',1);
		return $model->select();
	}
	
	public static function add($ActionInfo)
	{
		$model = new self();
		$model -> data($ActionInfo);
		return $model -> save();
	}
	public static function updateById($ActionInfo)
	{
		$model = new self();
		$list = [$ActionInfo];
		//saveAll方法只能通过主键更新eb_action主键ID
		return $model->saveAll($list);
	}
	
}