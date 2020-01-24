class ApplicationController < ActionController::Base
    require 'redis'

    def redisList(modelName)
        JSON.parse(redisDB.get(modelName) || '[]')
    end

    def insertToRedisList(modelName, rubyObject)
        redisDB.set(modelName, redisList(modelName).push(rubyObject).to_json)
    end

    def updateRedisList(modelName, updatedRubyObject)
        list = redisList(modelName).map { |item| item['id'] == updatedRubyObject.id ? updatedRubyObject : item }
        redisDB.set(modelName,list.to_json)
    end

    private 
    def redisDB
        Redis.new(host: 'localhost', port: 6379, db: 0)
    end

end
