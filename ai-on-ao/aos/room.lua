Members = Members or {}
Messages = Messages or {}

local arphy = "OIiPrioLCvdFfD2z1io1v70a5BSeb2RD6SENUEGOH3o" -- AI process ID

Handlers.add(
    "Register",
    { Action = "Register"},
    function (msg)
      table.insert(Members, msg.From)
      print(msg.From .. " Registered")
      msg.reply({ Data = "Registered." })
    end
  )

  Handlers.add(
    "Send-Message",
    { Action = "Send-Message" },
    function (msg)
        -- TODO: Add a check if the message is from a registered user

      table.insert(Messages, msg.Data)
      -- Acts as passthrough function to send a message to Arphy
      if string.match(string.lower(msg.Data), "hey arphy") and msg.From ~= arphy then
        ao.send({
            Target = arphy,
            Action = "Receive-Message",
            Data = msg.Data,
            From = msg.From
        })
        print(msg.From .. " sent a message to Arphy")
      else
        print(msg.From .. " sent a message to " .. msg.Data)
      end
    end
  )

-- TODO: Add a handler for removing a member