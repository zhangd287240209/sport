<?php

namespace app\ebapi\controller;
use app\ebapi\model\course\Course as CourseModel;
use think\Controller;
use service\UtilService;
use service\JsonService;

class CourseApi extends Controller
//class Index extends WapBasic
{
	public function addCourse()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$CourseInfo = UtilService::postMore([
            ['name',''],
			['uid'],
            ['action',[]]
        ],$request);
		
		$ActionInfo = $CourseInfo['action'];
		//dump($CourseInfo);
		//dump($ActionInfo);
		$res = CourseModel::add($CourseInfo,$ActionInfo);
		
		if($res)
			return JsonService::successful('OK!',['id'=>$res]);
		else
			return JsonService::fail('添加课程失败!');
		
	}
	public function getCourseById()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$CourseInfo = UtilService::postMore([
            ['id',0]
        ],$request);
		
		if($CourseInfo['id'] && CourseModel::be(['id'=>$CourseInfo['id']]))
			return JsonService::successful('OK!',CourseModel::getCourse($CourseInfo['id']));
		else
			return JsonService::fail('该ID课程不存在!');
		
	}
	public function editCourseById()
	{	
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$CourseInfo = UtilService::postMore([
			['id',0],
			['name',''],
            ['action',[]]
        ],$request);
		//如果该ID存在并且数据库中有该条数据
		if($CourseInfo['id'] && CourseModel::be(['id'=>$CourseInfo['id']]))
		{
			if(CourseModel::editCourseById($CourseInfo))
				return JsonService::successful();
			else
				return JsonService::fail('修改课程失败!');
		}
		else
			return JsonService::fail('该ID课程不存在!');
	}
	public function deleteCourseById()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$CourseInfo = UtilService::postMore([
			['id',0]
        ],$request);
		//如果该ID存在并且数据库中有该条数据
		if($CourseInfo['id'] && CourseModel::be(['id'=>$CourseInfo['id']]))
		{
			if(CourseModel::deleteCourseById($CourseInfo['id']))
				return JsonService::successful();
			else
				return JsonService::fail('删除课程失败!');
		}
		else
			return JsonService::fail('该ID课程不存在!');
	}
	
	public function deleteActionById()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$ActionInfo = UtilService::postMore([
			['id',0]
        ],$request);
		//如果该ID存在并且数据库中有该条数据
		if($ActionInfo['id'] && CourseModel::IsActionExist($ActionInfo['id']))
		{
			if(CourseModel::deleteActionById($ActionInfo['id']))
				return JsonService::successful();
			else
				return JsonService::fail('删除动作失败!');
		}
		else
			return JsonService::fail('该ID动作不存在!');
	}
	public function SearchCourseLike()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$search = UtilService::postMore([
            ['name','']
        ],$request);
		
		//dump($search);
		$courseInfo = CourseModel::searchCourseLike($search);
		
		$arr = json_decode($courseInfo,true);
		//dump($arr);
		return JsonService::successful('OK!',$arr);
	}
	public function SearchCourse()
	{
		$courseInfo = CourseModel::searchCourse();
		
		$arr = json_decode($courseInfo,true);
		//dump($arr);
		return JsonService::successful('OK!',$arr);
	}
	public function SelectCourse()
    {
		$request = $this->request;
        $param = $request->param();
		
		$count = 0;
		$key;
		$value;
		foreach($param as $x=>$x_value) {
		  //echo "Key=" . $x . ", Value=" . $x_value;
		  //echo "<br>";
		  if($count==1){
			  $key=$x ;
			  $value=$x_value;
		  }
		  $count++;
		}
		$courseArr=compact('key','value');
		//dump($courseArr);
		$courseInfo = CourseModel::getCourseInfo($courseArr);
		return json_encode($courseInfo);
    }
}