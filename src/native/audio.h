#pragma once
#include <napi.h>
#include <vector>
#include <memory>

class AudioTrack {
public:
    AudioTrack(const std::string& name);
    void process(float* buffer, size_t frames);
    std::string getName() const { return name; }

private:
    std::string name;
    std::vector<float> data;
};

class AudioEngine {
public:
    AudioEngine();
    ~AudioEngine();
    
    bool startPlayback();
    bool stopPlayback();
    void addTrack(const std::string& name);
    
private:
    std::vector<std::unique_ptr<AudioTrack>> tracks;
    bool isPlaying;
}; 