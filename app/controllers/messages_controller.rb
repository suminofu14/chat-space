class MessagesController < ApplicationController
  def index
    @messages = Message.all
  end

  def create
    @message = Message.create(message_params)
    if @message.save
      redirect_to root_path
    else
      render :index, alert: 'メッセージを入力してください。'
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image)
  end
end
