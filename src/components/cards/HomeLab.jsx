import graphic from '../../charts/MOTD-login-custom.png';

export default function HomeLabCard() {
  return (
    <div className="home-lab-card">
      <div className="graph-container">
        <img src={graphic} alt="Home Lab Overview" style={{ width: "100%", borderRadius: "12px" }} />
      </div>
      <p>
        I also occasionally like to work on setting up a homelab!<br />
        Currently I have a raspberry pi with tailscale VPN set up running 24/7 at home. I can SSH into it from my phone and personal laptop even
        when I am not connected to my home wifi. I have also taken several security precautions to ensure that it is safe from unknown requests.
        I have also written a bash script to automatically back up key files to my personal laptop so in the 
        event that it crashes or I accidentally lock myself out, I am able to reflash my OS and get back up and running relatively quickly.<br />
        I would eventually like to get to a place where I can run VMs, have a self hosted cloud backup system, and several other functionalities.<br />
        My final state home lab will require additional hardware I hope to slowly acquire over time. 
      </p>
    </div>
  );
}
