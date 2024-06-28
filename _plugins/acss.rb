Jekyll::Hooks.register :site, :pre_render do |site|
    files = []
    Dir["**/*.html"].reject { |f| f["_site"] || f["_drafts"] || f["node_modules"] || f["vendor"] }.each do |filename|
        files << filename
    end
    system("node_modules/.bin/atomizer %s -o _includes/css/atomic.css" % [files.join(" ")])
end
