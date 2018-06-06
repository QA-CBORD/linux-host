# %VERSION% is the package version

Summary: CBORD Student Package
Name: cbord-student
Version: %{_version}
Release: %{_release}
License: None
Group: None
URL: http://www.cbord.com
Source0: %{name}.tar.gz
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
BuildArch: noarch

%description
CBORD Student Package

%prep
%setup -q -n %{name}

%build

%install
rm -rf $RPM_BUILD_ROOT
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/fonts
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/i18n
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/icon
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/assets/img
install -c -d -m 775 $RPM_BUILD_ROOT/home/httpd/student/build

install -c -m 664 *.* $RPM_BUILD_ROOT/home/httpd/student
install -c -m 664 assets/fonts/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/fonts
install -c -m 664 assets/i18n/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/i18n
install -c -m 664 assets/icon/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/icon
install -c -m 664 assets/img/*.* $RPM_BUILD_ROOT/home/httpd/student/assets/img
install -c -m 664 build/*.* $RPM_BUILD_ROOT/home/httpd/student/build


%clean
rm -rf $RPM_BUILD_ROOT

%preun


%post


%files


/home/httpd/student


%doc
