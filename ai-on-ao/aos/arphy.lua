Llama = require("@sam/Llama-Herder")

local room = "Zdux8omTF-c9zeZiyehYTi70mctcbGaf7TH0Yv7g_KE"

Handlers.add("Receive-Message", { Action = "Receive-Message" }, function (msg)
    if msg.From ~= room then
        print("Unauthorized message from " .. msg.From)
        return
    end

    print(msg.From .. " sent a message to Arphy: " .. msg.Data)
    local outputTokens = '20'
    Llama.run(
        msg.Data, -- Your prompt
        outputTokens, -- Number of tokens to generate
        function(generatedText) 
            ao.send({ Target = room, Action = "Send-Message", Data = generatedText })
            print("Arphy sent a message to: " .. generatedText)
        end
    )
end)
