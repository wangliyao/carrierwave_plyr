class LynInsController < ApplicationController
  before_action :set_lyn_in, only: [:show, :edit, :update, :destroy]

  # GET /lyn_ins
  # GET /lyn_ins.json
  def index
    @lyn_ins = LynIn.all
  end

  # GET /lyn_ins/1
  # GET /lyn_ins/1.json
  def show
  end

  # GET /lyn_ins/new
  def new
    @lyn_in = LynIn.new
  end

  # GET /lyn_ins/1/edit
  def edit
  end

  # POST /lyn_ins
  # POST /lyn_ins.json
  def create
    @lyn_in = LynIn.new(lyn_in_params)
    @lyn_in.avatar = params[:lyn_in][:avatar]
    respond_to do |format|
      if @lyn_in.save
        format.html { redirect_to @lyn_in, notice: 'Lyn in was successfully created.' }
        format.json { render :show, status: :created, location: @lyn_in }
      else
        format.html { render :new }
        format.json { render json: @lyn_in.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lyn_ins/1
  # PATCH/PUT /lyn_ins/1.json
  def update
    respond_to do |format|
      if @lyn_in.update(lyn_in_params)
        format.html { redirect_to @lyn_in, notice: 'Lyn in was successfully updated.' }
        format.json { render :show, status: :ok, location: @lyn_in }
      else
        format.html { render :edit }
        format.json { render json: @lyn_in.errors, status: :unprocessable_entity }
      end
    end
  end

  def new_play
   set_lyn_in
    @lyn_in.avatar.url
  end

  # DELETE /lyn_ins/1
  # DELETE /lyn_ins/1.json
  def destroy
    @lyn_in.destroy
    respond_to do |format|
      format.html { redirect_to lyn_ins_url, notice: 'Lyn in was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lyn_in
      @lyn_in = LynIn.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lyn_in_params
      params.require(:lyn_in).permit(:name, :score, :description)
    end
end
