require 'test_helper'

class LynInsControllerTest < ActionController::TestCase
  setup do
    @lyn_in = lyn_ins(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lyn_ins)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lyn_in" do
    assert_difference('LynIn.count') do
      post :create, lyn_in: { description: @lyn_in.description, name: @lyn_in.name, score: @lyn_in.score }
    end

    assert_redirected_to lyn_in_path(assigns(:lyn_in))
  end

  test "should show lyn_in" do
    get :show, id: @lyn_in
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lyn_in
    assert_response :success
  end

  test "should update lyn_in" do
    patch :update, id: @lyn_in, lyn_in: { description: @lyn_in.description, name: @lyn_in.name, score: @lyn_in.score }
    assert_redirected_to lyn_in_path(assigns(:lyn_in))
  end

  test "should destroy lyn_in" do
    assert_difference('LynIn.count', -1) do
      delete :destroy, id: @lyn_in
    end

    assert_redirected_to lyn_ins_path
  end
end
