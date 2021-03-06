class DeviceSerializer < ApplicationSerializer
  attributes :fbos_version,
             :last_saw_api,
             :mounted_tool_id,
             :name,
             :ota_hour,
             :ota_hour_utc,
             :serial_number,
             :throttled_at,
             :throttled_until,
             :timezone,
             :tz_offset_hrs
end
