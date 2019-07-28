<?php

namespace app\ebapi\controller;
use app\ebapi\model\course\CourseAction as ActionModel;
use think\Controller;
use service\UtilService;
use service\JsonService;

class CourseactionApi extends Controller
{
	public function SelectActionLike()
    {
		$request = $this->request;
		if(!$request->isPost()) return JsonService::fail('参数错误!');
		$ActionInfo = UtilService::postMore([
			['id',0],
            ['name',''],
            ['part',''],
			['search','']
        ],$request);
		$res = ActionModel::getActionInfoLike($ActionInfo);
		//dump($ActionInfo);
		//dump($res );
		$actionJson='[';
		$partArr = array();
		
		foreach($res as $x=>$x_value) {
		  if(!in_array($x_value['part'].'|'.$x_value['pid'],$partArr))
		  {
			  $partArr[]=$x_value['part'].'|'.$x_value['pid'];
		  }
		}
		foreach($partArr as $part)
		{
			$array=explode('|', $part);
			$actionJson=$actionJson.'{"part":"'.$array[0].'","pid":"'.$array[1].'","action":[';
			foreach($res as $x=>$x_value) {
				if($x_value['part']==$array[0])
				{
					$actionJson=$actionJson.'{"name":"'.$x_value['name'].'","id":'.$x_value['id'].',"num":3,"checked":false'.'},';
				}
			}
			$actionJson=substr($actionJson, 0, -1);
			$actionJson=$actionJson.']},';
		}
		$actionJson=substr($actionJson, 0, -1);
		$actionJson=$actionJson.']';
		
		$arr = json_decode($actionJson,true);
		//return JsonService::successful('OK!',$arr);
		return $arr;
	}
	
	public function SelectAction()
    {
		$res = ActionModel::getActionInfo();
		//dump($ActionInfo);
		//dump($res );
		$actionJson='[';
		$partArr = array();
		
		foreach($res as $x=>$x_value) {
		  if(!in_array($x_value['part'].'|'.$x_value['pid'],$partArr))
		  {
			  $partArr[]=$x_value['part'].'|'.$x_value['pid'];
		  }
		}
		foreach($partArr as $part)
		{
			$array=explode('|', $part);
			$actionJson=$actionJson.'{"part":"'.$array[0].'","pid":"'.$array[1].'","action":[';
			foreach($res as $x=>$x_value) {
				if($x_value['part']==$array[0])
				{
					$actionJson=$actionJson.'{"name":"'.$x_value['name'].'","id":'.$x_value['id'].',"num":3,"checked":false'.'},';
				}
			}
			$actionJson=substr($actionJson, 0, -1);
			$actionJson=$actionJson.']},';
		}
		$actionJson=substr($actionJson, 0, -1);
		$actionJson=$actionJson.']';
		
		$arr = json_decode($actionJson,true);
		return JsonService::successful('OK!',$arr);
    }
	
	public function addAction()
	{
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$ActionInfo = UtilService::postMore([
            ['name',''],
            ['part','']
        ],$request);
		$res = ActionModel::add($ActionInfo);
		if($res)
			return JsonService::successful();
		else
			return JsonService::fail('添加课程失败!');
	}
	public function editActionById()
	{	
		$request = $this->request;
        if(!$request->isPost()) return JsonService::fail('参数错误!');
		$ActionInfo = UtilService::postMore([
			['id',0],
            ['name',''],
            ['part','']
        ],$request);
		//如果该ID存在并且数据库中有该条数据
		if($ActionInfo['id'] && ActionModel::be(['id'=>$ActionInfo['id']]))
		{
			if(ActionModel::edit($ActionInfo,$ActionInfo['id'],'id'))
				return JsonService::successful();
			else
				return JsonService::fail('修改课程失败!');
		}
		else
			return JsonService::fail('该ID课程不存在!');
	}
	public function deleteActionById()
	{
		$request = $this->request;
		$id=$request->param('id');
		if($id && ActionModel::be($id))
		{
			if(ActionModel::del($id))
				return JsonService::successful();
			else
				return JsonService::fail('删除课程失败!');
		}
		else
			return JsonService::fail('该ID课程不存在!');
	}
}