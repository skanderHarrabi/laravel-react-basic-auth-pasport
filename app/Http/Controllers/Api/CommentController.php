<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Comment;
use App\Post;
use App\User;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $post = Post::find($id);
        //this works but i need to pass the user who create the post
        //$comments = $post->comments;
        $comments = Comment::with('user')->where('post_id',$post->id)->get();
        $user = auth('api')->user();
        return [$comments,$user];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
          $post = Post::find($id);
          $this->validate($request,[
            'content'=>'required'
          ]);
          $comment=Comment::create([
            'content'=>$request->content,
            'user_id'=>auth()->user()->id,
            'post_id'=>$post->id,
          ]);
          return response()->json([]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if($comment->user_id !==auth()->user()->id)
        {
          abort('401');
        }
        $comment->delete();
        return response()->json([]);
    }
}
