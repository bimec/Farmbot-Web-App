# A singleton that runs on a separate process than the web server.
# Listens to *ALL* incoming logs and stores them to the DB.
# Also handles throttling.
class TelemetryService < AbstractServiceRunner
  MESSAGE = "TELEMETRY MESSAGE FROM %s"
  FAILURE = "FAILED TELEMETRY MESSAGE FROM %s"

  def process(delivery_info, payload)
    device_key = delivery_info
      .routing_key
      .split(".")[1]
    json = JSON.parse(payload)
    other_stuff = { device: device_key,
                   is_telemetry: true,
                   message: MESSAGE % device_key }
    puts json.merge(other_stuff).to_json
  rescue JSON::ParserError
    puts ({ device: device_key,
           is_telemetry: true,
           bad_json: payload,
           message: FAILURE % device_key }).to_json
  end
end
