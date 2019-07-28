<?php
namespace app\ebapi\model\course;

use basic\ModelBasic;
use service\JsonService;
use service\UtilService;
use traits\ModelTrait;
use think\Db;

class Course extends ModelBasic
{
	use ModelTrait;
	public static function getCourseInfo($courseArr)
	{
		$key=$courseArr['key'];
		$value=$courseArr['value'];
		$selectAyy=array($key=>$value);
		$courseInfo = self::get($selectAyy);
        if(!$courseInfo) exception('读取备课信息失败!');
        return $courseInfo->toArray();
	}
	
	public static function searchCourseLike($search)
	{
		$model = new self();
		$model = $model->field('id,name');
		$model = $model->where('name','LIKE', '%'.$search['name'].'%');
		$model = $model->where('is_del',1);
		
		//dump($model->select());
		
		return $model->select();
	}
	
	public static function searchCourse()
	{
		$model = new self();
		$model = $model->field('id,name');
		$model = $model->where('is_del',1);
		
		//dump($model->select());
		
		return $model->select();
	}
	
	public static function add($CourseInfo,$ActionInfo)
	{
		self::beginTrans();
		
		$model = new self();
		$model -> data($CourseInfo);
		$res1 = $model -> save();
		$id=$model->id;
		
		$arrlength=count($ActionInfo);
		for($x=0;$x<$arrlength;$x++)
		{
			$ActionInfo[$x]['courseId']=$id;
			//默认每组10个
			$ActionInfo[$x]['num']=10;
			//默认每个重量是10
			$ActionInfo[$x]['weigth']=10;
		}
		//dump($ActionInfo);
		$res2 = Db::name('courseActionRelation')->insertAll($ActionInfo);
		
        $res =$res1 !== false && $res2 !== false;
        self::checkTrans($res);
		if($res)
			return $id;
		else
			return 0;
	}
	public static function getCourse($id)
	{
		$model = new self();
		$model = $model->field('id,name');
		$res1 = $model -> where('id',$id)->select()->toArray();
		//dump($res1);
		
		$res2 = Db::query('SELECT a.id,a.courseId,a.actionId,a.frequency,a.num,a.weight,b.part,b.name,b.pid FROM eb_course_action_relation a join eb_course_action b where a.actionId=b.id and a.courseId=:id',['id'=>$id]);
		
		
		$action = '[';
		$arrlength = count($res2);
		//dump($arrlength);
		for($x=0;$x<$arrlength;$x++)
		{
			$action=$action.'{"id":'.$res2[$x]['id'].',"courseId":'.$res2[$x]['courseId'].',"actionId":'.$res2[$x]['actionId'].',"frequency":'.$res2[$x]['frequency'].',"num":'.$res2[$x]['num'].',"weight":'.$res2[$x]['weight'].',"part":"'.$res2[$x]['part'].'","name":"'.$res2[$x]['name'].'"},';
		}
		
		$action=substr($action, 0, -1);
		$action = $action.']';
		$arr = json_decode($action,true);
		$arrTotal=array();
		$arrTotal['id']=$res1[0]['id'];
		$arrTotal['name']=$res1[0]['name'];
		$arrTotal['action']=$arr;
		//dump($arrTotal);
		return $arrTotal;
	}
	public static function updateById($CourseInfo)
	{
		$model = new self();
		$list = [$CourseInfo];
		//saveAll方法只能通过主键更新eb_course主键ID
		return $model->saveAll($list);
	}
	public static function editCourseById($CourseInfo)
	{
		self::beginTrans();
		$res1 = self::where('id',$CourseInfo['id'])->update(['name'=>$CourseInfo['name']]);
		$action = $CourseInfo['action'];
		//dump($action );
		$res2=1;
		foreach($action as $Sa)
		{
			//dump($Sa);
			$res2 = Db::name('courseActionRelation')->update($Sa);
			//dump($res2);
		}
		
		$res =$res1 !== false && $res2 !== false;
        self::checkTrans($res);
		return $res;
	}
	
	public static function deleteCourseById($id)
	{
		return self::where('id',$id)->update(['is_del'=>0]);
		//return '111';
	}
	public static function deleteActionById($id)
	{
		return Db::name('courseActionRelation')->delete($id);
		//return '111';
	}
	public static function IsActionExist($id)
	{
		return 0 < Db::name('courseActionRelation')->where('id',$id)->count();
	}
	
}