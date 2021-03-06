class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update, :destroy]
  before_action :set_states, only: [:new, :edit, :update, :create]

  # GET /profiles
  # GET /profiles.json
  def index
    @profiles = Profile.unordered.order(:state)
    @profiles = @profiles.to_a

    Profile.ordered.order(updated_at: :asc).each do |p|
      @profiles.insert(p.order, p)
    end

    respond_to do |format|
      format.html
      format.csv{ send_data Profile.to_csv(@profiles), filename: "NADA100-Profiles-#{Time.now.to_s}.csv" }
      format.json
    end
  end

  # GET /profiles/1
  # GET /profiles/1.json
  def show
  end

  # GET /profiles/new
  def new
    @profile = Profile.new
  end

  # GET /profiles/1/edit
  def edit
  end

  # POST /profiles
  # POST /profiles.json
  def create
    @profile = Profile.new(profile_params)

    respond_to do |format|
      if @profile.save
        format.html { redirect_to @profile, notice: 'Profile was successfully created.' }
        format.json { render :show, status: :created, location: @profile }
      else
        format.html { render :new }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /profiles/1
  # PATCH/PUT /profiles/1.json
  def update
    respond_to do |format|
      if @profile.update(profile_params)
        format.html { redirect_to @profile, notice: 'Profile was successfully updated.' }
        format.json { render :show, status: :ok, location: @profile }
        format.js
      else
        format.html { render :edit }
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /profiles/1
  # DELETE /profiles/1.json
  def destroy
    @profile.destroy
    respond_to do |format|
      format.html { redirect_to profiles_url, notice: 'Profile was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_states
      @states = Address::STATE_HASH
      [:metro_chicago, :metro_detroit, :metro_new_york, :metro_cleveland].each do |c|
        @states[c.to_s.titlecase] = c.to_s.titlecase
      end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :suffix, :member_id,
                                      :display_name, :state, :years_of_membership, :in_memoriam,
                                      :next_gen, :years_for_next_gen, :next_gen_presidents_club,
                                      :photo, :remote_photo_url, :photo_cache,
                                      :order)
    end
end
