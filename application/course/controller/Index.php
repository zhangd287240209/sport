<?php
namespace app\course\controller;
use \think\Controller;

class Index extends Controller
{
	public function index()
	{
		//return 'Hello zhang1111';
		return $this->fetch();
	}
}